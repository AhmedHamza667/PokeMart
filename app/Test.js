// ExampleComponent.js
import React from 'react';
import { Text, Box } from '@shopify/restyle';
import { useTheme } from '@shopify/restyle';

const Test = () => {
  const theme = useTheme();

  return (
    <Box
      flex={1}
      backgroundColor="background"
      padding="md"
      justifyContent="center"
      alignItems="center"
    >
      <Text variant="header">Hello, World!</Text>
      <Box marginTop="lg">
        <Text variant="body" color="primary">
          Welcome to Restyle
        </Text>
      </Box>
    </Box>
  );
};

export default Test;
