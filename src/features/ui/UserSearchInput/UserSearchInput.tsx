import styles from "./user_search_input.module.css";

interface UserSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const UserSearchInput: React.FC<UserSearchInputProps> = ({
  value,
  onChange,
  placeholder = "Поиск...",
}) => {
  return (
    <input
      type="text"
      className={styles.searchInput}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
