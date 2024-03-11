import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export const GET = withApiAuthRequired(async function shows(req) {
  try {
    const res = new NextResponse();
    const { accessToken } = await getAccessToken(req, res, {
      scopes: ["create:book"],
    });

    console.log(accessToken);

    const response = await fetch(`http://api.huddle.fun/test/authorized`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => response.json());

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
});
