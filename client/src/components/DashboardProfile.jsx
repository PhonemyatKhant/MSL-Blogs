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
  updateFailure,
  updateStart,
  updateSuccess,
} from "@/redux/user/userSlice";
import { Loader2 } from "lucide-react";

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

  const { currentUser } = useSelector((state) => state.user);

  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // image: "",
      username: currentUser.username,
      email: currentUser.email,
     
    },
  });
  const { register, handleSubmit, setValue, formState } = form;

  //on submit
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
  return (
    <div className=" mt-5">
      <h1 className=" text-5xl font-semibold">My Profile</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className=" flex  justify-center gap-7  p-4 max-md:flex-col">
            {/* left */}
            <div className=" flex-1 space-y-4">
              <div
                onClick={() => filePickerRef.current.click()}
                className="relative cursor-pointer w-40  h-40 overflow-hidden rounded-full"
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
              {/* image input  */}
              {imageFileUploadError && (
                <Alert variant="destructive">
                  <AlertTitle>Error !</AlertTitle>
                  <AlertDescription>
                    {imageFileUploadError
                      ? imageFileUploadError
                      : "Update Unsuccessful!"}
                  </AlertDescription>
                </Alert>
              )}
              {isUpdateSuccessful !== null && (
                <Alert variant={!isUpdateSuccessful && "destructive"}>
                  <AlertTitle>
                    {isUpdateSuccessful ? "Success!" : "Oops!"}
                  </AlertTitle>
                  <AlertDescription>
                    {isUpdateSuccessful
                      ? "Update Successful!"
                      : "Update Failed!"}
                  </AlertDescription>
                </Alert>
              )}

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
              <div className=" flex justify-between items-center">
                <Button variant="link" className=" text-red-400 p-1">
                  Delete Account
                </Button>
                <Button variant="link" className=" text-red-400 p-1">
                  Sign Out
                </Button>
              </div>
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
                disabled={imageUploadComplete === false}
              >
                {imageUploadComplete ? (
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
