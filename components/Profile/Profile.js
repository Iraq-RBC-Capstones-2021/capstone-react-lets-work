import React from "react";
import TopSection from "./TopSection";
import { Text, Tag } from "@chakra-ui/react";

function Profile() {
  const user = {
    username: "Segun Adebayo",
    job: "Web Developer",
    bio: "I love Web development and I have been coding for last ten years",
    interests: ["Web", "Design", "HTML & Javascript"],
    skills_hobbies: ["Web Development", "Hiking"],
    social: { instagram: "", facebook: "", email: "", linkedIn: "" },
    about:
      "A mote of dust suspended in a sunbeam Sea of Tranquility vanquish the impossible shores of the cosmic ocean a billion trillion another world. Hearts of the stars a still more glorious dawn awaits with pretty stories for which theres little good evidence not a sunrise but a galaxyrise across the centuries inconspicuous motes of rock and gas? Something incredible is waiting to be known bits of moving fluff the only home we ve ever known emerged into consciousness two ghostly white figures in coveralls and helmets are soflty dancing emerged into consciousness.",
  };
  return (
    <TopSection
      username={user.username}
      bio={user.bio}
      job={user.job}
      about={user.about}
      interests={user.interests.map((interest) => (
        <Tag size="lg" variant="subtle" key={interest} m="1">
          {interest}
        </Tag>
      ))}
      skills_hobbies={user.skills_hobbies.map((skill) => {
        return <Text key={skill}>{skill}</Text>;
      })}
      email={user.social.email}
      instagram={user.social.instagram}
      facebook={user.social.facebook}
      linkedIn={user.social.linkedIn}
    />
  );
}

export default Profile;
