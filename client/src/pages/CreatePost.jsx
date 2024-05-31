import FormInput from "@/components/FormInput";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import ImageFormInput from "@/components/ImageFormInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";
import { ArrowLeft, Frown, Loader2, Smile } from "lucide-react";
import { useNavigate } from "react-router-dom";

//form schema

const formSchema = z.object({
  title: z.string().trim().min(6, "Title must be at least 6 characters long"),
  category: z
    .string()
    .trim()
    .min(1, "Category must be at least 6 characters long"),
  image: z.any(),

  content: z.any(),
});

const CreatePostPage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [content, setContent] = useState(null);

  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);

  const [postUploadSuccess, setPostUploadSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //use form

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
    },
  });
  const { register, handleSubmit, setValue, getValues } = form;

  // upload image function

  const uploadImageHandler = async () => {
    // setImageUploadComplete(false);

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
        // setImageUploadComplete(true);

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
          setValue("image", downloadURL);

          // setFormData({ ...formData, profilePicture: downloadURL });

          setImageFileUploading(false);

          // setImageUploadComplete(true);
        });
      }
    );
  };

  //on submit

  async function onSubmit(values) {
    if (content !== undefined) {
      values.content = content;
    }

    // remove html tags

    const pureString = values?.content?.replace(/<\/?[^>]+(>|$)/g, "");
    if (!pureString || pureString === " ") {
      // setContent(pureString);

      return;
    } else {
      try {
        setLoading(true);
        const res = await fetch("api/post/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: values.title,
            category: values.category,
            image: values.image,
            content: values.content,
          }),
        });
        const data = await res.json();
        if (!res.ok) setPostUploadSuccess(false);
        else {
          setPostUploadSuccess(true);
          navigate("/");
        }

        setLoading(false);
      } catch (error) {
        setPostUploadSuccess(false);
        setLoading(false);
        console.log(error.message);
      }
    }
  }

  return (
    <div className=" min-h-screen mx-auto mt-20 space-y-5  max-w-4xl w-full">
      {/* go back arrow  */}

      <Button onClick={() => navigate(-1)} className="p-0" variant="icon">
        <ArrowLeft />
      </Button>
      <h1 className=" text-5xl font-semibold">Create New Post</h1>

      {/* image upload error alert  */}

      {imageFileUploadError && (
        <Alert variant="destructive">
          <Frown />
          <AlertTitle>Error !</AlertTitle>
          <AlertDescription>{imageFileUploadError}</AlertDescription>
        </Alert>
      )}

      {/* post upload status alert  */}

      {postUploadSuccess !== null && (
        <Alert variant={!postUploadSuccess && "destructive"}>
          {postUploadSuccess ? <Smile /> : <Frown />}
          <AlertTitle>
            {" "}
            {postUploadSuccess ? "Success !" : "Error !"}
          </AlertTitle>
          <AlertDescription>
            {" "}
            {postUploadSuccess
              ? "New blog post created!"
              : "Failed to create a blog post!"}
          </AlertDescription>
        </Alert>
      )}

      {/* empty content alert  */}

      {content === "" ||
        (content === undefined && (
          <Alert variant="destructive">
            <Frown />
            <AlertTitle>Error !</AlertTitle>
            <AlertDescription>
              Please fill out the content form!
            </AlertDescription>
          </Alert>
        ))}

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            type="text"
            form={form}
            placeholder="title"
            name="title"
            label="Title"
          />
          <FormInput
            type="text"
            form={form}
            placeholder="#category"
            name="category"
            label="Category"
          />

          {/* image input and button  */}

          <div className=" flex gap-3 items-end flex-nowrap">
            <ImageFormInput
              className=" flex-1"
              type="file"
              form={form}
              name="image"
              label="Image"
              register={register}
              imageInputHandler={setImageFile}
            />
            <Button
              disabled={imageFileUploading}
              onClick={uploadImageHandler}
              type="button"
              variant="secondary"
            >
              {!imageFileUploading ? (
                "Upload Image"
              ) : (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              )}
            </Button>
          </div>

          {/* image showcase  */}

          {imageURL && (
            <div className=" w-full h-48">
              <img
                className=" object-cover w-full h-full"
                src={imageURL}
                alt={imageFile.name}
              />
            </div>
          )}

          <ReactQuill
            onChange={setContent}
            theme="snow"
            placeholder="Write something..."
          />
          <Button disabled={loading} type="submit" className="w-full">
            {!loading ? (
              "Submit"
            ) : (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreatePostPage;
