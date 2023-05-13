import React, { useState } from "react";
import { Typography, Button } from "@mui/material";

interface Props {
  description: string;
  howToUse: string;
  terms: string;
}

const ShowMoreText: React.FC<Props> = ({ description, howToUse, terms }) => {
  const [showAll, setShowAll] = useState(false);

  const displayText = showAll ? description : `${description.slice(0, 150)}...`;

  const handleShowMoreClick = () => {
    setShowAll(true);
  };

  const handleShowLessClick = () => {
    setShowAll(false);
  };

  return (
    <>
      <Typography variant="body1" color="textPrimary" my={3} gutterBottom>
        <b color="#696969">Deskripsi tiket</b> <br />
        {displayText}
      </Typography>
      {!showAll && description.length > 150 && (
        <Button size="small" color="primary" onClick={handleShowMoreClick}>
          Lihat lebih
        </Button>
      )}
      {showAll && (
        <>
          <Typography variant="body1" color="textPrimary" my={3} gutterBottom>
            <b color="#696969">Cara penggunaan</b> <br />
            {howToUse}
          </Typography>

          <Typography variant="body1" color="textPrimary" my={3} gutterBottom>
            <b color="#696969">Syarat dan ketentuan</b> <br />
            {terms}
          </Typography>

          <Button size="small" color="primary" onClick={handleShowLessClick}>
            Lihat lebih sedikit
          </Button>
        </>
      )}
    </>
  );
};

export default ShowMoreText;
