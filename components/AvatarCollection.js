import { AvatarGroup, Avatar, Tooltip } from "@chakra-ui/react";

export default function AvatarCollection({ users }) {
  const ToolTipAvatar = (props) => (
    <Tooltip label={props.name}>
      <Avatar {...props} />
    </Tooltip>
  );
  return (
    <AvatarGroup size="sm" max="4">
      {users.map((user) => (
        <ToolTipAvatar
          key={user.id}
          size="sm"
          name={user.name}
          src={user.imageURL}
        />
      ))}
    </AvatarGroup>
  );
}
