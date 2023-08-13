# Design Tokens

This repo will generate tokens from figma design. This function still Work In Progress (WIP), but still can be used to generate some palette for scss and json file.

## How to edit color palette

For now, if you want to change or add, you must follow the rules. If not, then the generator will not run properly.

> **Color palette can only be edited on the "Primitive" page**
>
> ![Primitive page](./src/static/primitive.png)

### Adding shade to color palette

1. Copy paste "Color Card" component. Make sure the copy is on "Colors" frame.

![Copy paste Color Card](./src/static/copy_paste_color_card.png)

2. Edit props on component "Color Card" (must use "Color Card" component).

![Edit Color Card props](./src/static/edit_color_card_props.png)

3. Click rectangle on "Color Card" component. Then edit fill prop.

![Edit rectangle color](./src/static/edit_rectangle_color.png)

### Adding variant to color palette

1. Copy paste "Section" frame. Make sure the copy is on "Content" frame.

![Add palette variant](./src/static/add_palette_variant.png)

2. Edit the title.

![Edit palette title](./src/static/edit_palette_title.png)

3. Then follow "[adding shade to color palette](#adding-shade-to-color-palette)".
