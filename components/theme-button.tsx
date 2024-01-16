/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function ThemeButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [selectedKeys, setSelectedKeys] = useState(new Set([`${theme}`]));
  const selectedValue = Array.from(selectedKeys)
    .join(", ")
    .replaceAll("_", " ");
  useEffect(() => {
    selectedValue === "light" ? setTheme("light") : setTheme("dark");
    setMounted(true);
  }, [selectedKeys]);

  if (!mounted) {
    return null;
  }

  const handleSelectionChange = (keys: any) => {
    setSelectedKeys(new Set(keys));
  };

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize">
          {selectedValue === "light" ? <Sun /> : <Moon />}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
      >
        <DropdownItem key="light">Light</DropdownItem>
        <DropdownItem key="dark">Dark</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default ThemeButton;
