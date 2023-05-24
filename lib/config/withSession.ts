import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next";
import { TransactionProps } from "../../models/transaction";

const ironOptions = {
  cookieName: "monas-eticket",
  password: "DVpQRQNN5MLGArH8yv6RQtpLeJhf3z7a",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production" ? true : false,
  },
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, ironOptions);
}

export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, ironOptions);
}

declare module "iron-session" {
  interface IronSessionData {
    adminId?: number;
    currentTransaction?: TransactionProps;
  }
}
