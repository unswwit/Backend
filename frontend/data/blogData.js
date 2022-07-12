import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  chip: {
    textTransform: "uppercase",
    color: "white",
    margin: "5px",
  },
});

const categoryDescriptions = {
  All: "Click here to see all the blog posts that we have posted!",
  "WIT Crush Wednesday":
    "Each Wednesday, we post a blog sharing the interview, journey, and experience of inspiring women in tech. Click here to read their empowering stories!",
  Lifestyle:
    "Wondering how you can improve your lifestyle? Read some eye-opening content here!",
  Upskill:
    "Having the skill-set to perform your best is essential. Learn about ways that you can upskill yourself in these blogs!",
  "Topical Technology":
    "In a fast-paced world, technology is making a growing impact in current events. Click here to read about tech in the news.",
  "Perception and Innovation":
    "Our understanding of technology is readily evolving along with innovation that is arising in tech. Read more about new start-ups, understanding tech disciplines, and upcoming innovation in these blogs.",
  Careers:
    "Wondering what you can do to excel in your professional life? Read here for tips on acing interviews, performing your best, and making the most of career opportunities!",
};

export { useStyles, categoryDescriptions };
