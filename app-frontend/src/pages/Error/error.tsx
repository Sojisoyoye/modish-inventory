import { Button, Card, Link, Stack, Typography } from '@mui/material';
import { FunctionComponent } from 'react';

export const ErrorPage = () => {
  return (
    <Card className="Message">
      <>
        <h2>Error</h2>
        <p>Oops❗️ An error occured</p>
        <div className="btn-container">
          <Stack>
            <Typography variant="h1" component="h2">
              Go home <Link href={'/'} />
            </Typography>
            ;
          </Stack>
        </div>
      </>
    </Card>
  );
};
