
interface SkillBadgeProps {
  name: string;
}

const SkillBadge = ({ name }: SkillBadgeProps) => {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground transition-all duration-300 hover:scale-105">
      {name}
    </span>
  );
};

export default SkillBadge;
