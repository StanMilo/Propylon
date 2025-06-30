import { TabPanelContainer } from "./TabPanel.styled";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`bill-tabpanel-${index}`}
      aria-labelledby={`bill-tab-${index}`}
      {...other}
    >
      {value === index && <TabPanelContainer>{children}</TabPanelContainer>}
    </div>
  );
};

export default TabPanel;
