import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { AiOutlineDown } from "react-icons/ai";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,
  background: "none",
  border: "none",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  ".MuiButtonBase-root": { padding: 0 },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<AiOutlineDown sx={{ fontSize: "0.9rem" }} color="#fff" />}
    {...props}
  />
))(({ theme, icontop }) => ({
  backgroundColor: "nuon",
  // flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper": {
    position: "absolute",
    right: "15px",
    top: `${icontop}px`,
    color: "#fff",
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    padding: 0,
    margin: 0,
    flexDirection: "column",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  paddingTop: "0px",
  ".nav-link & > a": {
    padding: "0 0 0 33px",
    "&.active": {
      background: "none",
      color: "#8061FF",
    },
    "&.active:before": {
      content: "none",
    },
    "&:hover": {
      color: "#8061FF",
      background: "none",
    },
  },
}));

const MenuAccordion = ({
  head,
  content,
  iconTop = 13,
  defaultExpanded = false,
}) => {
  const [expanded, setExpanded] = React.useState(defaultExpanded);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? true : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={handleChange()}
        defaultExpanded={false}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          icontop={iconTop}
        >
          {head}
        </AccordionSummary>
        <AccordionDetails>{content}</AccordionDetails>
      </Accordion>
    </div>
  );
};
export default MenuAccordion;
