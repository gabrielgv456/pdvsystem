import { ReactNode } from "react";
import styled from "styled-components";


export type PanelType = 'info' | 'warning' | 'error';


export const Panel = styled.div<{ type: PanelType }>`
  padding: 16px;
  border-radius: 4px;
  display: flex;
  gap:10px;
  margin: 3px 0 15px 0;
  font-size: 16px;
  background-color: ${({ type }) => {
    switch (type) {
      case 'info':
        return '#E8F4FD';
      case 'warning':
        return '#FFF4E5';
      case 'error':
        return '#FFE6E6';
      default:
        return '#F1F1F1';
    }
  }};
  border-left: 4px solid ${({ type }) => {
    switch (type) {
      case 'info':
        return '#0052CC';
      case 'warning':
        return '#FFAB00';
      case 'error':
        return '#DE350B';
      default:
        return '#A5ADBA';
    }
  }};
  color: ${({ type }) => {
    switch (type) {
      case 'info':
        return '#0052CC';
      case 'warning':
        return '#FF8B00';
      case 'error':
        return '#DE350B';
      default:
        return '#333';
    }
  }};
`;
