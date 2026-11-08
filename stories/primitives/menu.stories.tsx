"use client";

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AlignVerticalSpaceAround,
  Blocks,
  BookOpen,
  Camera,
  Clock,
  Cloud,
  CreditCard,
  Ellipsis,
  Eye,
  GitBranch,
  HardDrive,
  LifeBuoy,
  Link,
  LogOut,
  Mail,
  MessageSquare,
  MessagesSquare,
  Paperclip,
  Plus,
  PlusCircle,
  Rows2,
  Rows3,
  Settings,
  Share2,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button, IconButton } from "../../src/components/primitives/button";
import { Stack } from "../../src/components/primitives/flex";
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from "../../src/components/primitives/menu";
import { Thumbnail } from "../../src/components/primitives/thumbnail";
import { Text } from "../../src/components/primitives/typography";

function CheckboxMenu() {
  const [showBalance, setShowBalance] = useState(true);
  const [showPending, setShowPending] = useState(false);

  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>View</MenuTrigger>
      <MenuContent className="w-56">
        <MenuGroup>
          <MenuLabel>View</MenuLabel>
          <MenuCheckboxItem checked={showBalance} onCheckedChange={setShowBalance}>
            <Eye />
            Show balance
          </MenuCheckboxItem>
          <MenuCheckboxItem checked={showPending} onCheckedChange={setShowPending}>
            <Clock />
            Show pending
          </MenuCheckboxItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}

function RadioMenu() {
  const [density, setDensity] = useState("comfortable");

  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Density</MenuTrigger>
      <MenuContent className="w-56">
        <MenuGroup>
          <MenuLabel>Density</MenuLabel>
          <MenuRadioGroup value={density} onValueChange={setDensity}>
            <MenuRadioItem value="compact">
              <Rows3 />
              Compact
            </MenuRadioItem>
            <MenuRadioItem value="comfortable">
              <Rows2 />
              Comfortable
            </MenuRadioItem>
            <MenuRadioItem value="spacious">
              <AlignVerticalSpaceAround />
              Spacious
            </MenuRadioItem>
          </MenuRadioGroup>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}

const meta = {
  title: "Components/Overlay/Menu",
  component: Menu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open</MenuTrigger>
      <MenuContent align="start" className="w-56">
        <MenuGroup>
          <MenuLabel>My Account</MenuLabel>
          <MenuItem>
            <User />
            Profile
            <MenuShortcut>⇧⌘P</MenuShortcut>
          </MenuItem>
          <MenuItem>
            <CreditCard />
            Billing
            <MenuShortcut>⌘B</MenuShortcut>
          </MenuItem>
          <MenuItem>
            <Settings />
            Settings
            <MenuShortcut>⌘S</MenuShortcut>
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuItem>
            <Users />
            Team
          </MenuItem>
          <MenuSub>
            <MenuSubTrigger>
              <UserPlus />
              Invite users
            </MenuSubTrigger>
            <MenuSubContent>
              <MenuItem>
                <Mail />
                Email
              </MenuItem>
              <MenuItem>
                <MessageSquare />
                Message
              </MenuItem>
              <MenuSeparator />
              <MenuItem>
                <PlusCircle />
                More...
              </MenuItem>
            </MenuSubContent>
          </MenuSub>
          <MenuItem>
            <Plus />
            New Team
            <MenuShortcut>⌘+T</MenuShortcut>
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuItem>
            <GitBranch />
            Repository
          </MenuItem>
          <MenuItem>
            <LifeBuoy />
            Support
          </MenuItem>
          <MenuItem disabled>
            <Cloud />
            API
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuItem>
            <LogOut />
            Log out
            <MenuShortcut>⇧⌘Q</MenuShortcut>
          </MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  ),
};

export const Groups: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Account</MenuTrigger>
      <MenuContent className="w-56">
        <MenuGroup>
          <MenuLabel>Account</MenuLabel>
          <MenuItem>
            <User />
            Profile
            <MenuShortcut>⇧⌘P</MenuShortcut>
          </MenuItem>
          <MenuItem>
            <CreditCard />
            Billing
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuLabel>Session</MenuLabel>
          <MenuItem variant="destructive">
            <LogOut />
            Log out
          </MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  ),
};

export const Checkboxes: Story = {
  render: () => <CheckboxMenu />,
};

export const RadioGroup: Story = {
  render: () => <RadioMenu />,
};

export const Submenu: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Share</MenuTrigger>
      <MenuContent className="w-56">
        <MenuItem>
          <User />
          Profile
        </MenuItem>
        <MenuSub>
          <MenuSubTrigger>
            <Share2 />
            Share
          </MenuSubTrigger>
          <MenuSubContent>
            <MenuGroup>
              <MenuLabel>Send via</MenuLabel>
              <MenuItem>
                <Mail />
                Email
              </MenuItem>
              <MenuItem>
                <Link />
                Copy link
              </MenuItem>
            </MenuGroup>
          </MenuSubContent>
        </MenuSub>
        <MenuSeparator />
        <MenuItem variant="destructive">
          <LogOut />
          Log out
        </MenuItem>
      </MenuContent>
    </Menu>
  ),
};

export const Description: Story = {
  render: () => (
    <Menu>
      <MenuTrigger
        render={
          <IconButton aria-label="Add files and connectors" size="sm" variant="ghost" />
        }
      >
        <Plus />
      </MenuTrigger>
      <MenuContent align="start" className="w-72" side="top">
        <MenuItem>
          <Thumbnail>
            <Paperclip />
          </Thumbnail>
          <Stack align="start" className="min-w-0" gap="none" grow>
            <Text>Add files or photos</Text>
            <Text color="muted" type="supporting">
              Upload a document or image
            </Text>
          </Stack>
          <MenuShortcut>⌘U</MenuShortcut>
        </MenuItem>
        <MenuItem>
          <Thumbnail>
            <Camera />
          </Thumbnail>
          <Stack align="start" className="min-w-0" gap="none" grow>
            <Text>Take a screenshot</Text>
            <Text color="muted" type="supporting">
              Capture part of your screen
            </Text>
          </Stack>
        </MenuItem>
        <MenuSeparator />
        <MenuSub>
          <MenuSubTrigger>
            <Blocks />
            Connectors
          </MenuSubTrigger>
          <MenuSubContent className="w-64">
            <MenuItem>
              <Thumbnail>
                <HardDrive />
              </Thumbnail>
              <Stack align="start" className="min-w-0" gap="none" grow>
                <Text>Google Drive</Text>
                <Text color="muted" type="supporting">
                  Search and read files
                </Text>
              </Stack>
            </MenuItem>
            <MenuItem>
              <Thumbnail>
                <Mail />
              </Thumbnail>
              <Stack align="start" className="min-w-0" gap="none" grow>
                <Text>Gmail</Text>
                <Text color="muted" type="supporting">
                  Read and draft email
                </Text>
              </Stack>
            </MenuItem>
            <MenuSeparator />
            <MenuSub>
              <MenuSubTrigger>
                <Ellipsis />
                More
              </MenuSubTrigger>
              <MenuSubContent className="w-60">
                <MenuItem>
                  <Thumbnail>
                    <MessagesSquare />
                  </Thumbnail>
                  <Stack align="start" className="min-w-0" gap="none" grow>
                    <Text>Slack</Text>
                    <Text color="muted" type="supporting">
                      Read channels and threads
                    </Text>
                  </Stack>
                </MenuItem>
                <MenuItem>
                  <Thumbnail>
                    <BookOpen />
                  </Thumbnail>
                  <Stack align="start" className="min-w-0" gap="none" grow>
                    <Text>Notion</Text>
                    <Text color="muted" type="supporting">
                      Search pages and databases
                    </Text>
                  </Stack>
                </MenuItem>
              </MenuSubContent>
            </MenuSub>
          </MenuSubContent>
        </MenuSub>
      </MenuContent>
    </Menu>
  ),
};
