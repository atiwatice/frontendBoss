import axios from "axios";
import Router from "next/router";
import { Cookies } from "react-cookie";
import Axios from "../config/axios.setup";
import jwtDecode from "jwt-decode";



// set up cookies
const cookies = new Cookies();

export async function handleAuthSSR(ctx) {
  let token = null;

  if (ctx.req) {
    // ugly way to get cookie value from a string of values
    // good enough for demostration
    if (ctx.req.headers.cookie != null) {
      token = ctx.req.headers.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
    }
  } else {
    // we dont have request info aka Client Side
    token = cookies.get("token");
  }

  try {
    const user = jwtDecode(token);
    const response = await Axios.get("/getUsers/" + user.sub, {
      headers: { Authorization: `Bearer ${token}` },
    });

  } catch (err) {
    // in case of error
    console.log(err);
    console.log("redirecting back to main page");
    // redirect to login
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: "/",
      });
      ctx.res.end();
    } else {
      Router.push("/");
    }
  }
}
