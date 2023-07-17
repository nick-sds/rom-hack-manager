import { Flex } from "@chakra-ui/react";
import PathBrowser from "../../components/PathBrowser";
import Section from "../../components/Section";
import TextEditor from "../../components/TextEditor";
import useFormValue from "../../hooks/useFormValue";
import { useGame } from "../store";
import {
  validateDirectoryPath,
  validateFilePath,
  validateName,
} from "../validation";

type SectionSettingsProps = {
  gameId: string;
};

function SectionSettings({ gameId }: SectionSettingsProps) {
  const [game, gameMethods] = useGame(gameId);

  const gameName = useFormValue(game.name, {
    isDirty: game.name !== "",
    onChange: gameMethods.setName,
    validate: validateName,
  });

  const gameDirectory = useFormValue(game.directory, {
    isDirty: game.directory !== "",
    onChange: gameMethods.setDirectory,
    validate: validateDirectoryPath,
  });

  const gameOriginalCopy = useFormValue(game.originalCopy, {
    isDirty: game.originalCopy !== "",
    onChange: gameMethods.setOriginalCopy,
    validate: validateFilePath,
  });

  return (
    <Section title="Settings">
      <Flex direction="column" gap={3} mt={2}>
        <TextEditor
          autoFocus
          error={gameName.errorIfDirty}
          onBlur={gameName.handleBlur}
          onChange={gameName.handleChangeValue}
          placeholder="Game Name"
          value={gameName.value}
        />
        <PathBrowser
          error={gameDirectory.errorIfDirty}
          mode="directory"
          onBlur={gameDirectory.handleBlur}
          onChange={gameDirectory.handleChangeValue}
          placeholder="Main Folder"
          value={gameDirectory.value}
        />
        <PathBrowser
          error={gameOriginalCopy.errorIfDirty}
          mode="file"
          onBlur={gameOriginalCopy.handleBlur}
          onChange={gameOriginalCopy.handleChangeValue}
          placeholder="Original Copy"
          value={gameOriginalCopy.value}
        />
      </Flex>
    </Section>
  );
}

export default SectionSettings;
