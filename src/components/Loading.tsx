export default function Loading() {
  return (
    <>
      Loading{" "}
      <span className="flex gap-0.5">
        <span className="animate-[bounce_1s_ease-in-out_0s_infinite]">.</span>
        <span className="animate-[bounce_1s_ease-in-out_0.2s_infinite]">.</span>
        <span className="animate-[bounce_1s_ease-in-out_0.4s_infinite]">.</span>
      </span>
    </>
  );
}
