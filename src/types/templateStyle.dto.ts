export interface TemplateStyle {
  [key: string]: any;
  fontWeight?: string;
  labelsFontWeight?: string;
  SectionBgColor?: string;
  SectionTextAlignMent?: string;
  SectionBorder?: string;
  SectionBorderColor?: string;
  SectionBorderWidth?: string;
  SectionLabelUnderline?: string;
  showDot?: string;
  labelStyleForAll?: string;
  paddingPosition?: string;
  listItemsColor?: string;
  listItemsFontSize?: number;
  listItemsFontWeight?: string;
  listItemType?: string;
  listItemTextDecoration?: string;
  listDirection?: string;
  listAlignment?: string;
  paddingPx?: string;
  fontSize?: number;
  color?: string;
  labelsColor?: string;
  ShowlabelsColor?: string;
  ShowSectionBgColor?: string;
  labelsFontSize?: number;
  backgroundColor?: string;
  educationTemplate?: string | "default" | "template";
  showEducationStartOrEndDate?: string | "yes" | "no";
  showInstituteName?: string | "yes" | "no";
  showCourseName?: string | "yes" | "no";
  showEmploymentStartOrEndDate?: boolean;
  educationTemplateString?: string;
  showCompanyName?: boolean;
  showOrganizationName?: string | "yes" | "no";
  showRoleInCompany?: string | "yes" | "no";
  showCompanyStartOrEndDate?: string | "yes" | "no";
  employmentTemplate?: string | "default" | "template";
  employmentTemplateString?: string;
  personalDetailFields?: { label: string; name: string; showField: boolean }[];
  templateColorSwitch?: string | 'previous' | 'global';
  x: number;
  y: number;
  content: string;
  padding?: number;
  borderRadius?: number;
  borderColor?: string;
  strockColor?: string;
  borderWidth?: number;
  boxShadow?: string;
  imageUrl?: string;
  width?: number | string;
  height?: number | string;
  strockHeight?: number | string;
  borderEnabled?: boolean;
  value?: string;
  opacity?: number;
  filter?: string;
  overlay?: boolean;
  blur?: number;
  sectionType?: string;
  data?: any;
  key?: string;
}

export interface TemplateSideBarProps {
  // element: TemplateStyle | undefined;
  // onChange: (data: Partial<TemplateStyle>) => void;
  openThirdPartyUpload?: (value: string) => void;
  roleName: string | null;
  // handleCopyStyle?: (applyOn: string) => void;
}

export interface ITopBar {
  openThirdPartyUpload?: (imageSrc: string) => void;
  setIsModalOpen: React.ComponentState;
  setIsViewModalOpen: React.ComponentState;
  roleName: string | null;
}
