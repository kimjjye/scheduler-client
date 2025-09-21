export interface HeaderProps {
  title?: string;
  actions?: React.ReactNode;
}

const TheHeader = ({ title = "", actions }: HeaderProps) => {
  return (
    <header className="flex flex-row justify-between">
      <div className="">
        <h1>{title}</h1>
      </div>
      <div>{actions}</div>
    </header>
  );
};

export default TheHeader;
