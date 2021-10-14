import { AvatarGroup, Avatar } from "@chakra-ui/react";

export default function AvatarCollection({ users }) {
  return (
    <AvatarGroup size="sm" max="4">
      {users.map((user) => (
        <Avatar key={user.name} name={user.name} src={user.source} />
      ))}
    </AvatarGroup>
  );
}
