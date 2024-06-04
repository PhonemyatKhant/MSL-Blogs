import { Facebook, Github, Instagram, Linkedin } from "lucide-react";

import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" dark:bg-primary-foreground mt-6 grid grid-cols-1 text-white sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 bg-primary items-start gap-6 p-6 ">
      <div>
        <h1 className=" text-white text-5xl">
          Explore
          <br /> the
          <br /> MSL.
        </h1>
      </div>
      <div>
        <h1 className=" text-lg mb-1">LEGAL</h1>
        <h1 className=" underline mb-3 font-semibold">Privacy Policy</h1>
        <h1 className="underline mb-3 font-semibold">Terms & Conditions</h1>
      </div>
      <div>
        <h1 className="mb-2 text-xl">
          Sign-up now to join <br />a community of <br />
          myanmar spanish learners.
        </h1>
        <Link to="/about">
          <h1 className="underline">About</h1>{" "}
        </Link>
        <Link to="/payment-methods">
          <h1 className="underline">blogs</h1>{" "}
        </Link>
        <Link to="/contact-us">
          <h1 className="underline">Contact Us</h1>{" "}
        </Link>
      </div>
      <div>
        <h1 className="text-lg">Follow Us</h1>
        <div className="my-5 gap-3 flex justify-between items-center max-w-[100px]">
          <Link to="">
            <Facebook />
          </Link>
          <Link to="">
            {" "}
            <Linkedin />
          </Link>
          <Link to="">
            {" "}
            <Github />
          </Link>
          <Link to="">
            {" "}
            <Instagram />
          </Link>
        </div>
        <h1> &copy; {currentYear} MSL BLOGS</h1>
      </div>
    </footer>
  );
};

export default Footer;
