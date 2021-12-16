import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg"; // used as a component
import visibilityIcon from "../assets/svg/visibilityIcon.svg"; // Used as a source

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

import { toast } from "react-toastify";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { user } = userCredential;

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData, timestamp: serverTimestamp() };
      delete formDataCopy.password;

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      console.log("🚀 ~ file: SignUp.jsx ~ line 60 ~ onSubmit ~ error", error);
      toast.error("Something went wrong with registration");
    }
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome back!</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input
            type="name"
            className="nameInput"
            placeholder="Name"
            id="name"
            value={name}
            onChange={onChange}
          />
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />

          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput"
              placeholder="Password"
              id="password"
              value={password}
              onChange={onChange}
            />

            <img
              src={visibilityIcon}
              alt="show password"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot password
          </Link>

          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>

            <button className="signUpButton" type="submit">
              <ArrowRightIcon fill="#fff" width="34px" height="34px" />
            </button>
          </div>
        </form>

        <Link to="/sign-in" className="registerLink">
          Sign In Instead
        </Link>
      </main>
    </div>
  );
}

export default SignUp;
