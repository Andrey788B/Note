import { TextInput } from '@mantine/core';
import { Search } from 'lucide-react';
import type { SearchBoxProps } from '../types/ui';

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <TextInput
      placeholder="Поиск по заметкам"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      leftSection={<Search size={16} />}  //leftSection — слот слева (доступен в Mantine v7). Search — иконка
    />
  );
}