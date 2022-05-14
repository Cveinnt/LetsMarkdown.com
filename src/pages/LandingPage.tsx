import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HiChevronDoubleDown } from "react-icons/hi";
import { VscArrowRight } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import generate from "project-name-generator";
import { FullPage, Slide } from "react-full-page";
import MediaQuery from "react-responsive";
import { Link } from "react-scroll";
import LandingFeature from "../components/LandingFeature";

function getRandomId() {
  return generate({ number: true }).dashed;
}

function LandingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [showLogo, setShowLogo] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    // Animated landing page entrance sequence.
    setTimeout(() => setShowLogo(true), 500);
    setTimeout(() => setShowButton(true), 1500);
    setTimeout(() => setShowInfo(true), 2500);
  }, []);

  function handleClick() {
    setLoading(true);
    // Arbitrary delay for suspense reasons.
    setTimeout(() => {
      const id = getRandomId();
      navigate(`/${id}`);
    }, 500);
  }

  return (
    <FullPage>
      <Slide>
        <Flex w="100%" h="100vh" align="center" justify="center">
          <Stack>
            <Image
              src="/static/logo.png"
              w="md"
              opacity={showLogo ? 1 : 0}
              transition="opacity 0.5s"
            />
            <MediaQuery query="(min-device-width: 769px)">
              <Button
                size="lg"
                variant="ghost"
                textTransform="uppercase"
                fontSize="2xl"
                h={12}
                mb={6}
                rightIcon={<VscArrowRight />}
                _hover={{ transform: "scale(1.1)", bgColor: "gray.50" }}
                onClick={handleClick}
                isLoading={loading}
                opacity={showButton ? 1 : 0}
              >
                Enter
              </Button>
            </MediaQuery>
            <Box h={12} />
            <MediaQuery query="(max-device-width: 768px)">
              <Text align="center" fontSize="xs" fontWeight="light">
                Mobile usage is not currently supported.
              </Text>
              <Text align="center" fontSize="xs" fontWeight="light">
                Please use a desktop web browser.
              </Text>
            </MediaQuery>
            <MediaQuery query="(min-device-width: 769px)">
              <Link to="info" smooth={true}>
                <Stack
                  position="absolute"
                  w="md"
                  spacing={1}
                  p={3}
                  color="gray.600"
                  opacity={showInfo ? 1 : 0}
                  transition="opacity 0.5s"
                  bottom={3}
                  align="center"
                  fontWeight="semibold"
                  _hover={{ bgColor: "gray.50", cursor: "pointer" }}
                >
                  <Box fontSize="1em" textTransform="uppercase">
                    Scroll to learn more
                  </Box>
                  <Icon as={HiChevronDoubleDown} fontSize="lg" />
                </Stack>
              </Link>
            </MediaQuery>
          </Stack>
        </Flex>
      </Slide>
      <Slide id="info">
        <Flex
          h="100vh"
          direction="column"
          align="center"
          justify="center"
          bgColor="gray.50"
        >
          <SimpleGrid columns={3} spacing={8} my={6}>
            <LandingFeature title="Compose" image="/static/left.png" />
            <LandingFeature title="Preview" image="/static/center.png" />
            <LandingFeature title="Collaborate" image="/static/right.png" />
          </SimpleGrid>
          <Stack w="md">
            <Text
              align="center"
              fontSize="lg"
              mt={8}
              mb={3}
              fontWeight="semibold"
              textTransform="uppercase"
            >
              Markdown together.
            </Text>
            <Button
              size="lg"
              colorScheme="blue"
              fontSize="2xl"
              textTransform="uppercase"
              h={14}
              rightIcon={<VscArrowRight />}
              onClick={handleClick}
              isLoading={loading}
              opacity={showButton ? 1 : 0}
            >
              Start creating
            </Button>
          </Stack>
        </Flex>
      </Slide>
    </FullPage>
  );
}

export default LandingPage;
