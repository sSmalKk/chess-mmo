import React, { FormEvent, useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Input, Text } from "../../components";
import Footer from "../../components/Footer";

export default function RegisterPage() {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [message, setMessage] = useState<string>("");

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = (e.currentTarget.elements.namedItem("register-username") as HTMLInputElement).value;
    const email = (e.currentTarget.elements.namedItem("register-email") as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem("register-password") as HTMLInputElement).value;

    const formData = JSON.stringify({
      username,
      email,
      password,
    });

    try {
      const response = await fetch(`http://localhost:5000/admin/auth/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Device-Secret': 'myjwtclientsecret',
          'Credentials': 'include'
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        const authToken = data.data.token;
        localStorage.setItem('token', authToken);
        setRegisterSuccess(true);
        setRegisterError(false);
        window.location.href = "/"; // Redirect on successful registration
      } else {
        const errorMessage = await response.text();
        setMessage(errorMessage);
        setRegisterError(true);
        setRegisterSuccess(false);
      }
    } catch (error) {
      console.error("Error registering:", error);
      setRegisterError(true);
      setRegisterSuccess(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Role Player - Register</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-[32%] md:w-full mt-[19px] ml-[830px] mr-[72px] md:mx-5">
        <form onSubmit={handleRegisterSubmit} className="flex flex-col items-center justify-start w-full p-5 bg-black-900_60">
          {registerSuccess && (
            <div className="flex flex-col items-center justify-center w-full bg-green-300">
              <Text size="s" as="p" className="!text-green-700 !font-inter">
                Registration successful!
              </Text>
            </div>
          )}
          {registerError && (
            <div className="flex flex-col items-center justify-start w-full p-5 bg-red-300">
              <Text size="s" as="p" className="mt-[29px] !text-red-700 !font-inter">
                Failed to register. Please try again.
              </Text>
            </div>
          )}
          <div className="flex flex-col w-full mt-[28.11px] gap-[30px] md:px-5 max-w-xs">
            <div className="flex flex-col items-start justify-start w-full mt-[30px] gap-[7px]">
              <Text size="md" as="p" className="mt-[0.21px] mr-[261px] md:mr-5 tracking-[0.50px] !font-inter">
                Username
              </Text>
              <Input
                name="register-username"
                placeholder="Username"
                className="w-[99%] h-[57px] sm:w-full gap-[5px] mx-auto text-gray-A700 tracking-[0.50px] font-inter text-xs"
              />
            </div>
            <div className="flex flex-col items-start justify-start w-full mt-[30px] gap-[7px]">
              <Text size="md" as="p" className="mt-[0.21px] mr-[261px] md:mr-5 tracking-[0.50px] !font-inter">
                Email
              </Text>
              <Input
                name="register-email"
                type="email"
                placeholder="Email"
                className="w-full h-[36px] sm:w-full mb-px text-gray-A700 tracking-[0.50px] font-inter text-xs"
              />
            </div>
            <div className="flex flex-col items-start justify-start w-full mt-[30px] gap-[7px]">
              <Text size="md" as="p" className="mt-[0.21px] mr-[261px] md:mr-5 tracking-[0.50px] !font-inter">
              Password

              </Text>
              <Input
                name="register-password"
                type="password"
                placeholder="********"
                className="w-full h-[36px] sm:w-full mb-px text-gray-A700 tracking-[0.50px] font-inter text-xs"
              />
              <Text size="s" as="p" className="mt-[6.89px] mr-[88px] md:mr-5 !font-inter">
                At least one Uppercase, one number, one symbol
              </Text>
            </div>
          </div>
          <Button type="submit" className="h-[36px] mt-[30px] mb-5 px-[35px] sm:px-5 text-gray-A700 tracking-[0.50px] font-inter text-xs bg-blue_gray-900_19 min-w-[327px] rounded-[3px] sm:min-w-full">
            Register
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
}
