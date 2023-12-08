/* global django, JSONEditor */
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".inline-related:not(.empty-form) .jsoneditorwidget")
    .forEach((el) => {
      DjangoJSONEditorWidget.initWidget(el)
    })
})

document.addEventListener("DOMContentLoaded", () => {
  django.jQuery(document).on("formset:added", (event) => {
    event.target
      .querySelectorAll(".jsoneditorwidget")
      .forEach((el) => DjangoJSONEditorWidget.initWidget(el))
  })
})

const DjangoJSONEditorWidget = {
  initWidget: (el) => {
    DjangoJSONEditorWidget.initEditor(el)
  },
  initEditor: (el) => {
    const container = el.querySelector(".editor")
    const input = el.querySelector("textarea")
    const config = JSON.parse(el.dataset["editorConfig"])
    const editor = new JSONEditor(container, config)

    editor.on("ready", () => {
      const data = input.value ? JSON.parse(input.value) : null
      if (data) {
        editor.setValue(data)
      }
    })

    editor.on("change", () => {
      input.value = JSON.stringify(editor.getValue())
    })
  },
}
