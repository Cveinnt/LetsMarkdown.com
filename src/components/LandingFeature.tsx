import { Heading, Image, Stack } from "@chakra-ui/react";

type LandingFeatureProps = {
  title: string;
  image: string;
};

function LandingFeature({ title, image }: LandingFeatureProps) {
  return (
    <Stack align="center">
      <Heading size="xl" mb={1}>
        {title}
      </Heading>
      <Image maxW="sm" minW={0} rounded="md" shadow="md" src={image} />
    </Stack>
  );
}

export default LandingFeature;
