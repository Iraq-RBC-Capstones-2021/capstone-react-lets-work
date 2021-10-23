import React from "react";
import TopSection from "./TopSection";
import { Tag, Skeleton } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function Profile() {
  const userInfo = useSelector((state) => state.profile.entities);
  const loading = useSelector((state) => state.profile.loading);
  return loading ? (
    <Skeleton h="100%" size="100%" />
  ) : (
    <TopSection
      username={userInfo.username}
      bio={userInfo.bio}
      job={userInfo.job}
      about={userInfo.about}
      interests={userInfo.interests.map((interest) => (
        <Tag size="lg" variant="subtle" key={interest} m="1">
          {interest}
        </Tag>
      ))}
      skills_hobbies={userInfo.skills_hobbies}
      email={userInfo.social.email}
      instagram={userInfo.social.instagram}
      facebook={userInfo.social.facebook}
      linkedIn={userInfo.social.linkedIn}
    />
  );
}

export default Profile;
