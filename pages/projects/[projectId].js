import { useRouter } from "next/router";

const Project = () => {
  const router = useRouter();
  const projectId = router.query.projectId;
  return (
    <div>
      <h1>Project Details {projectId}</h1>
    </div>
  );
};

export default Project;
