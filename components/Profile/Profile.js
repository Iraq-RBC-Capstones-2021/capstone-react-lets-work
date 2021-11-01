import React from "react";
import TopSection from "./TopSection";
import { Tag, Skeleton } from "@chakra-ui/react";

function Profile({ userInfo, loading }) {
  return loading ? (
    <Skeleton h="100%" size="100%" />
  ) : (
    <TopSection
      user={userInfo}
      username={userInfo.username}
      bio={userInfo.bio}
      about={userInfo.about}
      userId={userInfo.id}
      interests={userInfo.interests.map((interest) => (
        <Tag size="lg" variant="subtle" key={interest.id} m="1">
          {interest.value}
        </Tag>
      ))}
      skills_hobbies={userInfo.skills_hobbies}
      email={userInfo.social.email}
      instagram={userInfo.social.instagram}
      facebook={userInfo.social.facebook}
      linkedIn={userInfo.social.linkedIn}
      imageURL={userInfo.imageURL}
    />
  );
}

export default Profile;
