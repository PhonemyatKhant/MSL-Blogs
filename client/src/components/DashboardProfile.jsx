import React, { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import FormInput from "./FormInput";
import { useDispatch, useSelector } from "react-redux";
import ImageFormInput from "./ImageFormInput";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  clearError,
  deleteFailure,
  deleteStart,
  deleteSuccess,
  signOutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "@/redux/user/userSlice";
import { Frown, Loader2, PartyPopper, Smile } from "lucide-react";
import PopUpDialog from "./PopUpDialog";
import { Link } from "react-router-dom";

const formSchema = z.object({
  image: z.any(),
  username: z
    .string()
    .trim()
    .min(6, "Username must be at least 6 characters long"),
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().trim().optional(),
});

const DashboardProfile = () => {
  const [imageURL, setImageURL] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [imageUploadComplete, setImageUploadComplete] = useState(true);
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(null);

  const { currentUser, error, loading } = useSelector((state) => state.user);

  const filePickerRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // image: "",
      username: currentUser.username,
      email: currentUser.email,
    },
  });
  const { register, handleSubmit, setValue, formState } = form;

  //on submit on update
  async function onSubmit(values) {
    values.image = imageURL || currentUser.profilePicture;

    dispatch(updateStart());

    try {
      //put request
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      //show alert
      if (res.ok) {
        setIsUpdateSuccessful(true);
      } else {
        setIsUpdateSuccessful(false);
      }
      !res.ok
        ? dispatch(updateFailure(data.message))
        : dispatch(updateSuccess(data));
    } catch (error) {
      dispatch(updateFailure(error.message));
    }

    console.log(values);
  }
  //set image url on change
  const imageInputHandler = (image) => {
    const imageURL = URL.createObjectURL(image);

    if (image) {
      setImageFile(image);
      setImageURL(imageURL);
    }
  };

  //upload image to firebase

  useEffect(() => {
    if (imageFile) {
      uploadImageHandler();
    }
  }, [imageFile]);

  // upload image function

  const uploadImageHandler = async () => {
    setImageUploadComplete(false);
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    // unique name
    const fileName = new Date().getTime() + imageFile.name;
    // ref storage
    const storageRef = ref(storage, fileName);
    // upload file to storage
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      // when error uploading
      (error) => {
        setImageUploadComplete(true);
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        // stop the progress
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageURL(null);
        setImageFileUploading(false);
      },
      // get image link after the uploading is done
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
          // setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
          setImageUploadComplete(true);
        });
      }
    );
  };

  const deleteUserHandler = async () => {
    dispatch(deleteStart());
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(deleteSuccess());
      } else {
        dispatch(deleteFailure(data.message));
      }
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };

  //sign out function

  const signOutHandler = async () => {
    try {
      const res = await fetch("/api/auth/sign-out", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signOutSuccess());
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div >
      <h1 className=" text-primary text-5xl font-semibold">My Profile</h1>

      {/* alert dialogs  */}
      <div className=" mt-6 space-y-3">
        {/* image input alert  */}
        {imageFileUploadError && (
          <Alert variant="destructive">
            <Frown />
            <AlertTitle>Error !</AlertTitle>
            <AlertDescription>{imageFileUploadError}</AlertDescription>
          </Alert>
        )}
        {/* error alert  */}
        {error && (
          <Alert variant="destructive">
            <Frown />
            <AlertTitle>Error !</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* successful update alert  */}
        {isUpdateSuccessful !== null && (
          <Alert variant={!isUpdateSuccessful && "destructive"}>
            {isUpdateSuccessful ? <Smile /> : <Frown />}
            <AlertTitle>{isUpdateSuccessful ? "Success!" : "Oops!"}</AlertTitle>
            <AlertDescription>
              {isUpdateSuccessful ? "Update Successful!" : "Update Failed!"}
            </AlertDescription>
          </Alert>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className=" flex justify-center gap-7  p-4 pt-10 max-md:flex-col md:items-end">
            {/* left */}
            <div className=" flex-1 space-y-4">
              {/* rounded image container  */}
              <div
                onClick={() => filePickerRef.current.click()}
                className="mb-4 mx-auto relative cursor-pointer  w-48  h-48 overflow-hidden rounded-full"
              >
                {imageFileUploadProgress && (
                  <CircularProgressbar
                    value={imageFileUploadProgress}
                    text={`${imageFileUploadProgress}%`}
                    strokeWidth={3}
                    styles={{
                      root: {
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      },
                      path: {
                        stroke: `rgba(00,00,00, ${
                          imageFileUploadProgress / 100
                        })`,
                      },
                      text: {
                        fill: "rgba(255, 255, 255, 1)",
                      },
                    }}
                  />
                )}
                <img
                  className={`object-cover w-full h-full rounded-full border p-1 ${
                    imageFileUploadProgress &&
                    imageFileUploadProgress < 50 &&
                    "opacity-40"
                  }`}
                  src={imageURL || currentUser.profilePicture}
                  alt={currentUser.username}
                />
              </div>
              {/* create post button  */}

              {currentUser.isAdmin && (
                <Link to="/create-post">
                  <Button className="w-full" variant="outline" type="button">
                    Create Post
                  </Button>
                </Link>
              )}

              {/* delete account sign out button  */}

              <div className=" flex justify-between items-center">
                <PopUpDialog
                  trigger={
                    <h1 className=" text-red-400 text-sm font-medium hover:underline">
                      Delete Account
                    </h1>
                  }
                  handlerFunction={deleteUserHandler}
                />
                <Button
                  type="button"
                  variant="link"
                  className=" text-red-400 p-1"
                  onClick={() => signOutHandler()}
                >
                  Sign Out
                </Button>
              </div>
              {/* file input hidden  */}
              <ImageFormInput
                className="hidden"
                type="file"
                form={form}
                name="image"
                label="Profile Image"
                register={register}
                reference={filePickerRef}
                imageInputHandler={imageInputHandler}
              />
            </div>
            {/* right  */}
            <div className=" flex-1 space-y-4">
              <FormInput
                type="text"
                form={form}
                placeholder="username"
                name="username"
                label="Username"
              />
              <FormInput
                form={form}
                placeholder="user@gmail.com"
                name="email"
                label="Email Address"
                type="email"
              />
              <FormInput
                form={form}
                placeholder="password"
                name="password"
                label="Password"
                type="password"
              />
              {/* submit btn  */}
              <Button
                className="w-full"
                type="submit"
                disabled={imageUploadComplete === false || loading}
              >
                {imageUploadComplete && !loading ? (
                  "UPDATE"
                ) : (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DashboardProfile;
