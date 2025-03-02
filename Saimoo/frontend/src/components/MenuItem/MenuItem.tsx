import { ChevronRight, ChevronDown } from "lucide-react";

interface MenuItemProps {
  title: string;
  subItems: string[];
  isOpen: boolean;
  onClick: () => void;
}

export default function MenuItem({ title, subItems, isOpen, onClick }: MenuItemProps) {
  return (
    <div>
      <button onClick={onClick} className="menu-button">
        {title}
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      {isOpen && (
        <ul className="menu-subitems">
          {subItems.map((subItem, subIndex) => (
            <li key={subIndex} className="menu-subitem">
              {subItem}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
