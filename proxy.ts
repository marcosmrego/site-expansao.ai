import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const auth = request.headers.get("authorization");

  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const [user, password] = atob(encoded).split(":");
      if (
        user === process.env.MONITORAMENTO_USER &&
        password === process.env.MONITORAMENTO_PASSWORD
      ) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Autenticação necessária", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="monitoramento"' },
  });
}

export const config = {
  matcher: "/monitoramento",
};
