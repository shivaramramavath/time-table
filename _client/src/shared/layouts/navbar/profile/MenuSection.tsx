interface MenuSectionProps {
  title: string;
  children: React.ReactNode;
}

const MenuSection = ({ title, children }: MenuSectionProps) => {
  return (
    <div className="border-t border-border/50 p-2">
      <p className="px-2 pb-1 pt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {title}
      </p>

      {children}
    </div>
  );
};

export default MenuSection;
