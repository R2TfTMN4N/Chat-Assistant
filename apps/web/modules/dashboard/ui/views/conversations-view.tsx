import Image from "next/image";

export const ConversationsView = () => {
  return (
    <div className="flex h-full flex-1 flex-col gap-y-4 bg-muted">
      <div className="flex flex-1 items-center justify-center gap-x-2">
        <Image
          alt="Logo"
          src="/apps/web/public/logo.svg"
          width={40}
          height={40}
        />
        <p className="font-semibold text-lg">cv Views</p>
      </div>
    </div>
  );
};
