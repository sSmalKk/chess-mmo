import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Input, Text } from "../../components";

export default function LoginPage() {
  const [loginError, setLoginError] = useState(false);
  const [message, setMessage] = useState<string>("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token") || process.env.JWT;
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (!token) return;

      try {
        const response = await fetch(`${apiUrl}/admin/user/me`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          navigate("/game");
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        localStorage.removeItem("token");
      }
    };

    checkLoginStatus();
  }, [token, navigate, apiUrl]);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = (e.currentTarget.elements.namedItem("login-username") as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem("login-password") as HTMLInputElement).value;

    const formData = JSON.stringify({ username, password });

    try {
      let response = await fetch(`${apiUrl}/admin/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Device-Secret": "myjwtclientsecret",
          Credentials: "include",
        },
        body: formData,
      });

      if (!response.ok) {
        response = await fetch(`${apiUrl}/client/auth/login`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Device-Secret": "myjwtclientsecret",
            Credentials: "include",
          },
          body: formData,
        });
      }

      if (response.ok) {
        const data = await response.json();
        const authToken = data.data.token;
        localStorage.setItem("token", authToken);
        setLoginError(false);
        window.location.href = "/menu";
      } else {
        const errorMessage = await response.text();
        setMessage(errorMessage);
        setLoginError(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage("Failed to login. Please try again.");
      setLoginError(true);
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
          {loginError && (
            <div className="flex flex-col items-center justify-start w-full p-5 bg-red-300">
              <Text size="s" as="p" className="mt-[29px] !text-red-700 !font-inter">
                {message}
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
    </>
  );
}
