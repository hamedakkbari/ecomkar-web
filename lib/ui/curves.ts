export interface Point { x: number; y: number }

export interface ComputeOptions {
  reduced?: boolean;
  minCx?: number;
  maxCx?: number;
  shortLen?: number; // for reduced mode (mobile)
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function getSpineAnchors(containerHeight: number, stepCount: number): number[] {
  if (stepCount <= 0 || containerHeight <= 0) return [];
  const spacing = containerHeight / (stepCount + 1);
  const anchors: number[] = [];
  for (let i = 1; i <= stepCount; i++) {
    const jitter = (i % 2 === 0 ? 1 : -1) * Math.min(12, spacing * 0.08);
    anchors.push(i * spacing + jitter);
  }
  return anchors;
}

export function alignToNearestAnchorY(y: number, anchors: number[]): number {
  if (!anchors.length) return y;
  let best = anchors[0];
  let bestDist = Math.abs(y - best);
  for (let i = 1; i < anchors.length; i++) {
    const d = Math.abs(y - anchors[i]);
    if (d < bestDist) {
      best = anchors[i];
      bestDist = d;
    }
  }
  return best;
}

export function computeConnector(
  fromRect: DOMRect,
  spineX: number,
  side: 'left' | 'right',
  anchors: number[],
  opts: ComputeOptions = {}
): { d: string; anchor: Point; cp1: Point; cp2: Point; start: Point; end: Point } {
  const { reduced = false } = opts;
  const start: Point = {
    x: side === 'right' ? fromRect.left - 8 : fromRect.right + 8,
    y: fromRect.top + fromRect.height / 2,
  };

  const endY = alignToNearestAnchorY(start.y, anchors);
  const end: Point = { x: spineX, y: endY };

  if (reduced) {
    const len = clamp(opts.shortLen ?? 32, 24, 48);
    const endReduced: Point = {
      x: side === 'right' ? start.x - len : start.x + len,
      y: start.y,
    };
    const dReduced = `M ${start.x},${start.y} L ${endReduced.x},${endReduced.y}`;
    return { d: dReduced, anchor: endReduced, cp1: start, cp2: endReduced, start, end: endReduced };
  }

  const distanceX = Math.abs(start.x - end.x);
  const cp1xDelta = clamp(distanceX * 0.6, 40, 160);
  const cp2xDelta = clamp(distanceX * 0.4, 24, 120);

  const cp1: Point = {
    x: start.x + (side === 'right' ? -cp1xDelta : cp1xDelta),
    y: start.y,
  };
  const cp2: Point = {
    x: end.x + (side === 'right' ? +cp2xDelta : -cp2xDelta),
    y: end.y,
  };

  const d = `M ${start.x},${start.y} C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${end.x},${end.y}`;
  return { d, anchor: end, cp1, cp2, start, end };
}




