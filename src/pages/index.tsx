import {
  useGetMyUnion,
  useGetUnion,
} from "@/domains/query-hook/queries/unions";

export default function Home() {
  const { data } = useGetUnion("union");

  console.log("data", data);
  return (
    <>
      <div>hello</div>
    </>
  );
}
