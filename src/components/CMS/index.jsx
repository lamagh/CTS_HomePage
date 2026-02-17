import { TextField } from "@mui/material";
import styles from "./cms.module.css";
import DropFileZone from "../DropFileZone";
import { contentType } from "../../constants/types";
import { checkIcon, editIcon } from "../../constants/assets";

export function FieldEditor({ data, onClick, onChange }) {
  const determineEditor = () => {
    switch (data.type) {
      case contentType.text:
        return <TextEditorBuilder data={data} onChange={onChange} />;

      case contentType.kpi:
        return <KPIEditorBuilder data={data} onChange={onChange} />;

      case contentType.bullet:
        return <BulletEditorBuilder data={data} onChange={onChange} />;

      case contentType.successStory:
        return <SuccessStoryEditorBuilder data={data} onChange={onChange} />;

      case contentType.image:
      case contentType.video:
        return <VideoAndImageEditorBuilder data={data} onChange={onChange} />;

      default:
        return <></>;
    }
  };

  return (
    <form onSubmit={onClick}>
      <div
        className={`${styles.fieldContainer} ${data.editMode && styles.active}`}
      >
        <div className={styles.textInputContainer}>{determineEditor()}</div>
        <button
          className={`${styles.editButton} ${
            data.editMode ? styles.activeEditButton : null
          }`}
          type="submit"
        >
          <img src={data.editMode ? checkIcon : editIcon} alt="edit icon" />
        </button>
      </div>
    </form>
  );
}

function TextEditorBuilder({ data, onChange }) {
  const type = contentType.text;
  return (
    <>
      {data.editMode ? (
        <TextField
          value={data.text}
          className={styles.textInput}
          autoFocus
          name="text"
          required
          placeholder="Enter some text"
          onChange={(e) => onChange(data.id, type, e)}
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length
            )
          }
          multiline
        />
      ) : (
        <p className={styles.text}>{data.text}</p>
      )}
    </>
  );
}

function VideoAndImageEditorBuilder({ data, onChange }) {
  return (
    <DropFileZone
      onChange={onChange}
      type={data.type}
      index={data.id}
      editMode={data.editMode}
      url={data.text}
      name="text"
    />
  );
}

function KPIEditorBuilder({ data, onChange }) {
  const type = contentType.kpi;
  return (
    <>
      {data.editMode ? (
        <>
          <TextField
            value={data.title}
            className={styles.textInput}
            autoFocus
            required
            name="title"
            label="Title"
            placeholder="Enter some text"
            onChange={(e) => onChange(data.id, type, e)}
            onFocus={(e) =>
              e.currentTarget.setSelectionRange(
                e.currentTarget.value.length,
                e.currentTarget.value.length
              )
            }
            multiline
          />
          <div className={styles.flexContainer}>
            <TextField
              value={data.count}
              className={styles.textInput}
              type="number"
              name="count"
              label="Number"
              required
              placeholder="Enter a number"
              onChange={(e) => onChange(data.id, type, e)}
            />
            <TextField
              value={data.unit}
              className={styles.textInput}
              name="unit"
              label="Unit"
              placeholder="Enter a unit"
              onChange={(e) => onChange(data.id, type, e)}
              onFocus={(e) =>
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.length,
                  e.currentTarget.value.length
                )
              }
            />
          </div>
        </>
      ) : (
        <>
          <p className={styles.text}>{data.title}</p>
          <p className={styles.text}>{data.count + " " + (data.unit || "")}</p>
        </>
      )}
    </>
  );
}

function BulletEditorBuilder({ data, onChange }) {
  const type = contentType.bullet;
  return (
    <>
      {data.editMode ? (
        <>
          <TextField
            value={data.title}
            className={styles.textInput}
            autoFocus
            required
            name="title"
            label="Title"
            placeholder="Enter some text"
            onChange={(e) => onChange(data.id, type, e)}
            onFocus={(e) =>
              e.currentTarget.setSelectionRange(
                e.currentTarget.value.length,
                e.currentTarget.value.length
              )
            }
            multiline
          />
          <TextField
            value={data.subTitle}
            className={styles.textInput}
            type="number"
            name="subTitle"
            label="Sub Title"
            placeholder="Enter some text"
            onChange={(e) => onChange(data.id, type, e)}
          />
          <TextField
            value={data.body}
            className={styles.textInput}
            name="body"
            label="Body"
            required
            placeholder="Enter some text"
            onChange={(e) => onChange(data.id, type, e)}
            onFocus={(e) =>
              e.currentTarget.setSelectionRange(
                e.currentTarget.value.length,
                e.currentTarget.value.length
              )
            }
          />
        </>
      ) : (
        <>
          <p className={styles.text}>{data.title}</p>
          <p className={styles.text}>{data.subTitle}</p>
          <p className={styles.text}>{data.body}</p>
        </>
      )}
    </>
  );
}

function SuccessStoryEditorBuilder({ data, onChange }) {
  const type = contentType.successStory;
  return (
    <>
      {data.editMode ? (
        <>
          <TextField
            value={data.title}
            className={styles.textInput}
            autoFocus
            required
            name="title"
            label="Title"
            placeholder="Enter some text"
            onChange={(e) => onChange(data.id, type, e)}
            onFocus={(e) =>
              e.currentTarget.setSelectionRange(
                e.currentTarget.value.length,
                e.currentTarget.value.length
              )
            }
            multiline
          />
          <TextField
            value={data.subTitle}
            className={styles.textInput}
            type="number"
            name="subTitle"
            label="Sub Title"
            placeholder="Enter some text"
            onChange={(e) => onChange(data.id, type, e)}
          />
          <TextField
            value={data.body}
            className={styles.textInput}
            name="body"
            label="Body"
            required
            placeholder="Enter some text"
            onChange={(e) => onChange(data.id, type, e)}
            onFocus={(e) =>
              e.currentTarget.setSelectionRange(
                e.currentTarget.value.length,
                e.currentTarget.value.length
              )
            }
          />
        </>
      ) : (
        <>
          <p className={styles.text}>{data.successStory.title}</p>
        </>
      )}
    </>
  );
}
