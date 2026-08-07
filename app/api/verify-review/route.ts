import { NextRequest, NextResponse } from 'next/server';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface PlaceReview {
  rating: number;
  publishTime?: string;
  relativePublishTimeDescription?: string;
  text?: { text: string; languageCode: string };
  authorAttribution?: { displayName: string; photoUri: string; uri: string };
}

interface PlaceResponse {
  reviews?: PlaceReview[];
}

interface VerifyResponse {
  verified: boolean;
  message: string;
  debug?: string;
}

// ─── Config ────────────────────────────────────────────────────────────────────

const API_KEY = process.env.GOOGLE_PLACES_API_KEY ?? '';
const PLACE_ID = process.env.GOOGLE_PLACE_ID ?? 'ChIJYavma1HkbIcRyjpS9H5f038';

// How many minutes after opening Maps we look for a new review
const VERIFICATION_WINDOW_MINUTES = 20;

// ─── Dev Mock ──────────────────────────────────────────────────────────────────
// When no real API key is set, simulate verification so the full flow works locally.
const DEV_MOCK_ALWAYS_VERIFIED = API_KEY === '' || API_KEY === 'your_google_places_api_key_here';

// ─── Route Handler ─────────────────────────────────────────────────────────────

export async function GET(req: NextRequest): Promise<NextResponse<VerifyResponse>> {
  const { searchParams } = new URL(req.url);
  const pendingTsParam = searchParams.get('pendingTs');
  const pendingTs = pendingTsParam ? parseInt(pendingTsParam, 10) : null;

  // ── Dev mock mode ────────────────────────────────────────────────────────────
  if (DEV_MOCK_ALWAYS_VERIFIED) {
    console.log('[verify-review] DEV MODE — returning mock verified=true');
    return NextResponse.json({
      verified: true,
      message: 'Review verified successfully! (Dev mock)',
      debug: 'No API key set; using development mock.',
    });
  }

  // ── Validate input ────────────────────────────────────────────────────────────
  if (!pendingTs || isNaN(pendingTs)) {
    return NextResponse.json(
      {
        verified: false,
        message: 'Please leave a Google review to claim your reward.',
        debug: 'Missing or invalid pendingTs parameter.',
      },
      { status: 400 }
    );
  }

  try {
    // ── Call Google Places API (New) ──────────────────────────────────────────
    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE_ID)}`;

    const res = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'reviews',
        'Content-Type': 'application/json',
      },
      // No cache — we need fresh data every time
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('[verify-review] Places API error:', res.status, await res.text());
      return NextResponse.json(
        {
          verified: false,
          message: 'Review verification service is temporarily unavailable. Please try again.',
          debug: `Places API returned ${res.status}`,
        },
        { status: 502 }
      );
    }

    const data: PlaceResponse = await res.json();
    const reviews = data.reviews ?? [];

    // ── Check for recent review ───────────────────────────────────────────────
    const windowStartMs = pendingTs;
    const windowEndMs = pendingTs + VERIFICATION_WINDOW_MINUTES * 60 * 1000;
    const nowMs = Date.now();

    // Use a generous window: from when the user tapped Maps to now (max VERIFICATION_WINDOW_MINUTES)
    const effectiveEndMs = Math.min(windowEndMs, nowMs + 60_000); // +1 min buffer

    const hasRecentReview = reviews.some((review) => {
      if (!review.publishTime) return false;
      const reviewTs = new Date(review.publishTime).getTime();
      // Review must have been posted AFTER the user tapped Maps
      return reviewTs >= windowStartMs && reviewTs <= effectiveEndMs;
    });

    if (hasRecentReview) {
      return NextResponse.json({
        verified: true,
        message: 'Review verified successfully! Scratch your card to claim your reward.',
      });
    }

    return NextResponse.json({
      verified: false,
      message: 'Please leave a Google review to claim your reward.',
      debug: `Found ${reviews.length} reviews; none in window [${new Date(windowStartMs).toISOString()} – ${new Date(effectiveEndMs).toISOString()}]`,
    });
  } catch (err) {
    console.error('[verify-review] Unexpected error:', err);
    return NextResponse.json(
      {
        verified: false,
        message: 'Review verification service is temporarily unavailable. Please try again.',
        debug: String(err),
      },
      { status: 500 }
    );
  }
}
