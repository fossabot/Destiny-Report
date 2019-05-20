import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "../src/Link.js";

const player = ({ player, platform }) => (
  <Container maxWidth="sm">
    <Box my={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome {player}
      </Typography>
      <Link href="/" color="primary">
        Go back to home page
      </Link>
    </Box>
  </Container>
);

player.getInitialProps = async ({ query }) => {
  return { player: query.player, platform: query.platform };
};

export default player;
