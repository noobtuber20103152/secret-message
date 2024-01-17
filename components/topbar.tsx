"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
  Spinner,
} from "@nextui-org/react";
import { Logo } from "./logo";
import ThemeButton from "./theme-button";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { signOut, useSession } from "next-auth/react";
function Topbar() {
  const { data: session, status } = useSession();

  const [userData, setUserData] = useState("nothing");
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data.data);
      setUserData(res.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, [pathname]);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successfully!!");
      setUserData("nothing");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar
      className="fixed"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className=" pr-3" justify="center">
        <NavbarBrand>
          <Link href="/">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeButton />
        </NavbarItem>
        <NavbarItem className="lg:flex">
          {loading ? (
            <Spinner />
          ) : userData !== "nothing" ? (
            <Button onClick={logout} color="danger">
              Logout
            </Button>
          ) : status === "authenticated" ? (
            <Button onClick={async () => await signOut()} color="danger">
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button color="primary">Login</Button>
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Topbar;
