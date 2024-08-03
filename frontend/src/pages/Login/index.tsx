import React, { FormEvent, useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Input, Text } from "../../components";
import Footer from "../../components/Footer";

export default function LoginPage() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [message, setMessage] = useState<string>("");

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = (e.currentTarget.elements.namedItem("login-username") as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem("login-password") as HTMLInputElement).value;

    const formData = JSON.stringify({
      username,
      password,
    });

    try {
      const response = await fetch(`${apiUrl}/admin/auth/login`, {
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
        setLoginSuccess(true);
        setLoginError(false);
        window.location.href = "/sandbox";
      } else {
        const errorMessage = await response.text();
        setMessage(errorMessage);
        setLoginError(true);
        setLoginSuccess(false);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginError(true);
      setLoginSuccess(false);
    }
  };


  return (
    <>
      <Helmet>
        <title>Role Player</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-[32%] md:w-full mt-[19px] ml-[830px] mr-[72px] md:mx-5">
        <form onSubmit={handleLoginSubmit} className="flex flex-col items-center justify-start w-full p-5 bg-black-900_60">
          {loginSuccess && (
            <div className="flex flex-col items-center justify-center w-full bg-green-300">
              <Text size="s" as="p" className="!text-green-700 !font-inter">
                Login successful!
              </Text>
            </div>
          )}
          {loginError && (
            <div className="flex flex-col items-center justify-start w-full p-5 bg-red-300">
              <Text size="s" as="p" className="mt-[29px] !text-red-700 !font-inter">
                Failed to login. Please try again.
              </Text>
            </div>
          )}
          <div className="flex flex-col w-full mt-[28.11px] gap-[30px] md:px-5 max-w-xs">
            <div className="flex flex-col items-start justify-start w-full mt-[30px] gap-[7px]">
              <Text size="md" as="p" className="mt-[0.21px] mr-[261px] md:mr-5 tracking-[0.50px] !font-inter">
                Login
              </Text>
              <Input
                name="login-username"
                placeholder="Login"
                className="w-[99%] h-[57px] sm:w-full gap-[5px] mx-auto text-gray-A700 tracking-[0.50px] font-inter text-xs"
              />
            </div>
            <div className="flex flex-col items-start justify-start w-full mt-[30px] gap-[7px]">
              <Text size="md" as="p" className="mt-[0.21px] mr-[261px] md:mr-5 tracking-[0.50px] !font-inter">
                Password
              </Text>
              <Input
                name="login-password"
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
            Login
          </Button>
          <Button className="h-[36px] mt-[30px] mb-5 px-[35px] sm:px-5 text-gray-A700 tracking-[0.50px] font-inter text-xs bg-blue_gray-900_19 min-w-[327px] rounded-[3px] sm:min-w-full">
            Esqueci a senha
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
}
