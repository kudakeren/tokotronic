export function foodVoucherImage(title: string) {
  const value = title.toLowerCase();
  if (value.includes("sushi") || value.includes("bento")) {
    return "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80";
  }
  if (value.includes("bakso")) {
    return "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80";
  }
  if (value.includes("kopi") || value.includes("croissant")) {
    return "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80";
  }
  if (value.includes("ayam") || value.includes("geprek")) {
    return "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=900&q=80";
  }
  return "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80";
}

export function serviceImage(title: string) {
  const value = title.toLowerCase();
  if (value.includes("pulsa")) {
    return "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=900&q=80";
  }
  if (value.includes("paket data") || value.includes("internet")) {
    return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80";
  }
  if (value.includes("pln") || value.includes("listrik")) {
    return "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80";
  }
  if (value.includes("pdam")) {
    return "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=80";
  }
  if (value.includes("bpjs")) {
    return "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80";
  }
  if (value.includes("e-wallet")) {
    return "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=80";
  }
  if (value.includes("game")) {
    return "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80";
  }
  return "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80";
}

