import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "../src/Link.js";

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js v4-beta example
        </Typography>
        <Link
          href="/player?player=xXSARKURDZz&platform=psn"
          color="secondary"
          as="/player/psn/xXSARKURDZz"
        >
          Go to xXSARKURDZz page
        </Link>
      </Box>
    </Container>
  );
}
