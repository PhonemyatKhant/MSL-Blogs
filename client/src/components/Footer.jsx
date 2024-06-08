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
        <Link to="/search">
          <h1 className="underline">Blogs</h1>{" "}
        </Link>
        <h1>phonemyatkhant45@gmail.com</h1>
      </div>
      <div>
        <h1 className="text-lg">Follow Me</h1>
        <div className="my-5 gap-3 flex justify-between items-center max-w-[100px]">
          <Link to="https://github.com/PhonemyatKhant">
            <Facebook />
          </Link>
          <Link to="https://github.com/PhonemyatKhant">
            {" "}
            <Linkedin />
          </Link>
          <Link to="https://github.com/PhonemyatKhant">
            {" "}
            <Github />
          </Link>
          <Link to="https://github.com/PhonemyatKhant">
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
