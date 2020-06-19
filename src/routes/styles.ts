import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { Category } from './DrawerContent';

export const ProductList = styled(FlatList as new () => FlatList<Category>)``;
