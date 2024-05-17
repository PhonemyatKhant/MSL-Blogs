import React from "react";
import { Button } from "./ui/button";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccess } from "@/redux/user/userSlice";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      // console.log(resultsFromGoogle.user);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoURL: resultsFromGoogle.user.photoURL,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/");
        dispatch(signInSuccess(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      onClick={handleGoogleClick}
      className=" flex items-center gap-2  w-full"
      type="button"
      variant="outline"
    >
      <FaGoogle /> <span> Continue with Google</span>
    </Button>
  );
};

export default OAuth;
